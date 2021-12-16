import React from 'react';
import { TitleBar } from '@opensumi/ide-main-layout/lib/browser/accordion/titlebar.view';
import { localize } from '@opensumi/ide-core-common/lib/localize';
import { Icon } from '@opensumi/ide-components/lib/icon/icon';
import { Input } from '@opensumi/ide-components/lib/input/Input';

import { TestingExplorerTree } from './testing.explorer.tree';
import styles from './testing.module.less';

export const TestingView = () => {
  return (
    <div className={styles.testing_container}>
      <TitleBar title={localize('test.title')} menubar={null} />
      <Input placeholder={'Filter (e.g. text, !exclude, @tag)'} addonAfter={<Icon icon='filter' />} />
      <TestingExplorerTree />
    </div>
  );
};