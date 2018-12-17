import { Gist } from '@/store/gist/reducer';
import React from 'react';
import { MdDelete } from 'react-icons/md';
import { Spring } from 'react-spring';
import styles from './index.module.css';

interface Props extends Partial<Gist> {
  onDelete: () => void;
  onHoverEnter: () => void;
  onHoverLeave: () => void;
  hover?: boolean;
  className?: string;
}

class GistListItem extends React.Component<Props> {
  public render() {
    const {
      title,
      hover,
      description,
      onDelete,
      onHoverEnter,
      onHoverLeave,
    } = this.props;

    return (
      <Spring
        from={{ background: hover ? 'rgb(20, 47, 67)' : 'hsla(0,0%,100%,.1)' }}
        to={{ background: hover ? 'hsla(0,0%,100%,.1)' : 'rgb(20, 47, 67)' }}
      >
        {props => (
          <div
            className={styles.gistLitsItem}
            onMouseEnter={onHoverEnter}
            onMouseLeave={onHoverLeave}
            style={props}
          >
            <div>
              <MdDelete onClick={onDelete} />
            </div>
            <div>{title}</div>
            <div>{description}</div>
          </div>
        )}
      </Spring>
    );
  }
}

export default GistListItem;
