import * as React from 'react';
import * as styles from './file-tree.module.less';
import { localize, CommandService } from '@ali/ide-core-common';
import { useInjectable, FILE_COMMANDS } from '@ali/ide-core-browser';

export const EmptyTreeView = () => {
  const commandService: CommandService = useInjectable(CommandService);

  const openFolder = () => {
    commandService.executeCommand(FILE_COMMANDS.OPEN_FOLDER.id, {newWindow : false});
  };

  return <div>
    <div className={styles.empty_view}>
      <p>{ localize('file.empty.defaultMessage') }</p>
      <a className={styles.empty_button} onClick={openFolder}>{ localize('file.empty.openFolder') }</a>
    </div>
  </div>;
};