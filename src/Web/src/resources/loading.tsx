import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';

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
                        <Fade in={true} unmountOnExit>
                            <div>
                                {display.loading && <CircularProgress />}
                                {display.error && (
                                    <Typography variant="h5">
                                        Server Error!
                                    </Typography>
                                )}
                            </div>
                        </Fade>
                    </div>
                ) : (
                    children
                )}
            </section>
        );
    }
}

// export const Loading = (display: { loading: boolean, error: boolean }, children: JSX.Element[] | JSX.Element) => (
//   <section>
//     {display && (display.loading || display.error) && (
//       <div style={{
//         height: '100%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}>
//         <Fade
//           in={true}
//           unmountOnExit
//         >
//           {display.loading && <CircularProgress />}
//           {display.error && <Typography variant='h5'>Server Error!</Typography>}
//         </Fade>
//       </div>
//     )}
//     {children}
//   </section>
// );
