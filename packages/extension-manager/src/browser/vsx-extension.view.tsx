import * as React from 'react';
import { useState, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { localize } from '@ide-framework/ide-core-common';
import { useInjectable } from '@ide-framework/ide-core-browser';
import { Tabs } from '@ide-framework/ide-components';
import { AutoFocusedInput } from '@ide-framework/ide-main-layout/lib/browser/input';

import { IVSXExtensionService, TabActiveKey, VSXExtension, VSXExtensionServiceToken } from '../common';
import { Extension } from './extension';
import * as styles from './vsx-extension.module.less';
import { OPEN_VSX_EXTENSION_MANAGER_CONTAINER_ID } from './const';

const tabMap = [
  TabActiveKey.MARKETPLACE,
  TabActiveKey.INSTALLED,
];

export const VSXExtensionView = observer(() => {
  const [activeKey, setActiveKey] = useState<TabActiveKey>(TabActiveKey.MARKETPLACE);
  const vsxExtensionService = useInjectable<IVSXExtensionService>(VSXExtensionServiceToken);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    vsxExtensionService.search(e.target.value);
  };

  const onInstall = useCallback((extension: VSXExtension) => {
    return vsxExtensionService.install(extension);
  }, []);

  const onClick = useCallback((extension) => {
    const id = extension?.namespace?.toLowerCase() + '.' + extension?.name?.toLowerCase();
    vsxExtensionService.openExtensionEditor(id);
  }, []);

  return (
    <div className={styles.panel}>
      <Tabs
        mini
        className={styles.tabs}
        value={tabMap.indexOf(activeKey)}
        onChange={(index: number) => {
          const activeKey = tabMap[index];
          if (activeKey) {
            setActiveKey(activeKey);
          }
        }}
        tabs={[localize('marketplace.panel.tab.marketplace'), localize('marketplace.tab.installed')]}
      />
      <div style={{ padding: '8px' }}>
        <AutoFocusedInput
          containerId={OPEN_VSX_EXTENSION_MANAGER_CONTAINER_ID}
          placeholder={localize('marketplace.panel.tab.placeholder.search')}
          value={''}
          onChange={onChange}
        />
      </div>
      <div className={styles.extensions_view}>
        {vsxExtensionService.extensions.map((e) => {
          return (
            <Extension onClick={onClick} onInstall={onInstall} key={`${e.namespace}-${e.name}`} extension={e} />
          );
        })}
      </div>
    </div>
  );
});