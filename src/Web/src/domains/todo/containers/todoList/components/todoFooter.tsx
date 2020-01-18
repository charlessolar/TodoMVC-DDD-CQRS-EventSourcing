import classNames from 'classnames';

import { ALL, COMPLETED, ACTIVE } from '../../constants';

interface Props {
    count: number;
    shownFilter: number;
    completedCount: number;
    onClearCompleted: Function;
    onChangeFilter: Function;
}


export const TodoFooter = (props: Props) => {
    const { count, shownFilter, completedCount, onClearCompleted, onChangeFilter } = props;

    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{count}</strong> item(s) left
          </span>
            <ul className="filters">
                <li>
                    <a
                        onClick={onChangeFilter.bind(ALL)}
                        className={classNames({ selected: shownFilter === ALL })}>

                        All
              </a>
                </li>
                {' '}
                <li>
                    <a
                        onClick={onChangeFilter.bind(ACTIVE)}
                        className={classNames({ selected: shownFilter === ACTIVE })}>
                        Active
              </a>
                </li>
                {' '}
                <li>
                    <a
                        onClick={onChangeFilter.bind(COMPLETED)}
                        className={classNames({ selected: shownFilter === COMPLETED })}>
                        Completed
              </a>
                </li>
            </ul>
            {completedCount > 0 && <button
                className="clear-completed"
                onClick={() => onClearCompleted()}>
                Clear completed
                </button>
            }
        </footer>
    );
}