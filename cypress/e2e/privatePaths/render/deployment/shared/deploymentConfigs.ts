export type DeploymentConfig = {
  ownerName: string;
  depName: string;
  hasWorkbench: boolean;
  connectInstructionsText: string;
  includesCloneSection: boolean;
  includesRemotesapi: boolean;
  minBackupCount: number;
  backupDbName: string;
  backupSizeUnit: string;
  stoppedDep: { ownerName: string; depName: string };
};

export const doltConfig: DeploymentConfig = {
  ownerName: "automated_testing",
  depName: "us-jails",
  hasWorkbench: true,
  connectInstructionsText: "MySQL Client",
  includesCloneSection: true,
  includesRemotesapi: true,
  minBackupCount: 10,
  backupDbName: "us-jails",
  backupSizeUnit: "MB",
  stoppedDep: { ownerName: "dolthub", depName: "us-jails-2" },
};

export const doltgresConfig: DeploymentConfig = {
  ownerName: "automated_testing",
  depName: "doltgres-test",
  hasWorkbench: false,
  connectInstructionsText: "Psql Client",
  includesCloneSection: false,
  includesRemotesapi: false,
  minBackupCount: 5,
  backupDbName: "getting_started",
  backupSizeUnit: "KB",
  stoppedDep: { ownerName: "dolthub", depName: "us-jails-2" },
};
