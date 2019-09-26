import { IRPCProtocol } from '@ali/ide-connection';
import { IExtensionHostService, IExtensionWorkerHost, IExtension, WorkerHostAPIIdentifier } from '../../../common';
import { createLayoutAPIFactory } from './worker.host.layout';
import { ExtHostAPIIdentifier } from '../../../common/vscode';
import { ExtHostCommands } from '../vscode/ext.host.command';

export function createAPIFactory(
  rpcProtocol: IRPCProtocol,
  extensionService: IExtensionHostService | IExtensionWorkerHost,
  type: string,
) {

  if (type === 'worker') {
    rpcProtocol.set(WorkerHostAPIIdentifier.ExtWorkerHostExtensionService, extensionService);
  }

  const extHostCommands = rpcProtocol.set(ExtHostAPIIdentifier.ExtHostCommands, new ExtHostCommands(rpcProtocol)) as ExtHostCommands;
  return (extension: IExtension) => {
    return {
      layout: createLayoutAPIFactory(extHostCommands)
    };

  };
}
