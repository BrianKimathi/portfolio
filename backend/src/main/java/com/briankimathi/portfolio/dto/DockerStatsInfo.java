package com.briankimathi.portfolio.dto;

import com.github.dockerjava.api.model.CpuStatsConfig;
import com.github.dockerjava.api.model.MemoryStatsConfig;
import com.github.dockerjava.api.model.StatisticNetworksConfig;
import com.github.dockerjava.api.model.StatsConfig;
import com.github.dockerjava.api.model.Statistics;

import java.util.Map;

public record DockerStatsInfo(
        String containerId,
        double cpuPercent,
        double memoryUsageMb,
        double memoryLimitMb,
        double memoryPercent,
        long networkRxBytes,
        long networkTxBytes
) {
    public static DockerStatsInfo fromStatistics(String containerId, Statistics stats) {
        CpuStatsConfig cpuStats = stats.getCpuStats();
        CpuStatsConfig preCpuStats = stats.getPreCpuStats();

        double cpuPercent = 0.0;
        if (cpuStats != null && preCpuStats != null
                && cpuStats.getCpuUsage() != null && preCpuStats.getCpuUsage() != null) {

            long cpuDelta = cpuStats.getCpuUsage().getTotalUsage()
                    - preCpuStats.getCpuUsage().getTotalUsage();
            long systemDelta = cpuStats.getSystemCpuUsage()
                    - preCpuStats.getSystemCpuUsage();
            long onlineCpus = cpuStats.getOnlineCpus() != null ? cpuStats.getOnlineCpus() : 1L;

            if (systemDelta > 0 && cpuDelta > 0) {
                cpuPercent = (double) cpuDelta / systemDelta * onlineCpus * 100.0;
            }
        }

        MemoryStatsConfig memStats = stats.getMemoryStats();
        long memUsage = 0;
        long memLimit = 1;

        if (memStats != null) {
            memUsage = memStats.getUsage() != null ? memStats.getUsage() : 0;
            memLimit = memStats.getLimit() != null ? memStats.getLimit() : 1;

            StatsConfig memDetails = memStats.getStats();
            if (memDetails != null && memDetails.getCache() != null) {
                memUsage -= memDetails.getCache();
            }
        }

        double memPercent = (double) memUsage / memLimit * 100.0;

        long rx = 0, tx = 0;
        Map<String, StatisticNetworksConfig> networks = stats.getNetworks();
        if (networks != null) {
            for (StatisticNetworksConfig net : networks.values()) {
                rx += net.getRxBytes() != null ? net.getRxBytes() : 0;
                tx += net.getTxBytes() != null ? net.getTxBytes() : 0;
            }
        }

        return new DockerStatsInfo(
                containerId,
                Math.min(cpuPercent, 100.0),
                memUsage / (1024.0 * 1024.0),
                memLimit / (1024.0 * 1024.0),
                Math.min(memPercent, 100.0),
                rx,
                tx
        );
    }
}
