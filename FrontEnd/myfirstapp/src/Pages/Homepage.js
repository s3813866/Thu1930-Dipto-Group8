import React, {Component} from "react";

class homePage extends Component {
    render() {
        return (
            <div>
                <title>Bookeroo Homepage</title>
                <p>This is the home page</p>
            </div>
        )
    }
}
export default homePage;

// function HomePage({ classes }: HomePageProps) {
//     return (
//         <div className={classes.root}>
//             <CssBaseline />
//             <PrimarySearchAppBar />
//
//         </div>
//     );
// }

// const styles = () =>
//     createStyles({
//         root: {
//             minHeight: "100vh",
//             backgroundImage: `url(${process.env.PUBLIC_URL + backgroundImage})`,
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//         },
//     });
//
// type HomePageProps = WithStyles<typeof styles>;
//
