
import { MarkAllComplete, MarkAllActive } from '../../../services';

interface Props {
    activeTodoCount: number;
    todoIds: string[];
}

export const TodoToggling = (props: Props) => {

    const { activeTodoCount, todoIds } = props;

    // a clumsy attempt to encapsulate 2 services
    const [processingComplete, loadingComplete, errorComplete, markComplete] = MarkAllComplete();
    const [processingActive, loadingActive, errorActive, markActive] = MarkAllActive();

    const toggleAll = (e: React.FormEvent) => {
        if ((e.target as any).checked) {
            markComplete(todoIds);
        } else {
            markActive(todoIds);
        }
    }

    return (
        <Loading display={{ loading: loadingComplete || loadingActive, error: errorComplete || errorActive }}>
            <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                onChange={toggleAll}
                checked={activeTodoCount === 0}
            />
            <label
                htmlFor="toggle-all"
            >
                Mark all as complete
     </label>
        </Loading>
    );
}