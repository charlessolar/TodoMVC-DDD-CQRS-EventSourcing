

interface Props {
    display: { loading: boolean; error?: boolean };
}

// because the type definition for the func is too hard to get right
export class Loading extends React.PureComponent<Props> {
    public render() {
        const { display, children } = this.props;

        const block = display && (display.loading || display.error);

        return (
            <section>
                {block ? (
                    <div
                        style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >

                        <div>
                            {display.loading && "Loading..."}
                            {display.error && (
                                <h5>
                                    Server Error!
                                    </h5>
                            )}
                        </div>
                    </div>
                ) : (
                        children
                    )}
            </section>
        );
    }
}
