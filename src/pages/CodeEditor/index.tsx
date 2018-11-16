/**
 * https://stackblitz.com/docs
 */
import StackBlitzSDK from '@stackblitz/sdk';
import { VM } from '@stackblitz/sdk/typings/VM';
import React from 'react';

import styles from './index.module.css';

// Create the index.ts file
const code = `import moment from 'moment';

document.getElementById('time').innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');
`;

// Create the index.html file
const html = `<h1>I was created on <span id='time'></span></h1>`;

// Create the project payload.
const project = {
  dependencies: {
    moment: '*', // * = latest version
  },
  description: 'Created with <3 by the StackBlitz SDK!',
  files: {
    'index.html': html,
    'index.ts': code,
  },
  tags: ['stackblitz', 'sdk'],
  template: 'typescript',
  title: 'Dynamically Generated Project',
};

interface State {
  loadingEditor: boolean;
}

class CodeEditor extends React.Component<{}, State> {
  public vm: VM;

  public componentDidMount() {
    this.embedNewProject();
  }

  public openNewProject = () => {
    StackBlitzSDK.openProject(project);
  };

  public embedNewProject = () => {
    StackBlitzSDK.embedProject('stackblitz', project, {
      forceEmbedLayout: true,
      // clickToLoad: true,
      height: '100%',
      // hideExplorer: true,
      // hideNavigation: true,
    }).then(vm => {
      this.vm = vm;
    });
  };
  public getFsSnapshot = async () => {
    const fs = await this.vm.getFsSnapshot();
    console.log(fs);
    const dep = await this.vm.getDependencies();
    console.log(dep);
  };

  public render() {
    return (
      <div className={styles.codeeditor}>
        <div id="stackblitz" />
      </div>
    );
  }
}

export default CodeEditor;
