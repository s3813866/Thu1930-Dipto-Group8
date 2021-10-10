// import * as React from 'react';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
//
// const Alert = React.forwardRef(function Alert(props, ref) {
//     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });
//
//
// export default function CustomizedSnackbars() {
//     const [open, setOpen] = React.useState(false);
//
//     const handleClick = () => {
//         setOpen(true);
//     };
//
//     const handleClose = (event, reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//
//         setOpen(false);
//     };
//
//
//     return (
//         <>
//         <Stack spacing={2} sx={{ width: '100%' }}>
//             <Button variant="outlined" onClick={handleClick}>
//                 Open success snackbar
//             </Button>
//
//             {/*<Alert severity="error">This is an error message!</Alert>*/}
//             {/*<Alert severity="warning">This is a warning message!</Alert>*/}
//             {/*<Alert severity="info">This is an information message!</Alert>*/}
//             {/*<Alert severity="success">This is a success message!</Alert>*/}
//         </Stack>
//             <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//                 <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
//                     This is a success message!
//                 </Alert>
//             </Snackbar>
//         </>
//     );
// }

// import * as React from 'react';
// import { experimentalStyled as styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import {Card, Container, ListGroup, ListGroupItem} from "react-bootstrap";
//
// const Item = styled(Paper)(({ theme }) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));
//
// export default function ResponsiveGrid() {
//     return (
//         <Container>
//             <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//                 {Array.from(Array(10)).map((_, index) => (
//                     <Grid item xs={2} sm={4} md={4} key={index}>
//                         <Card style={{ width: '18rem' }}>
//                             <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
//                             <Card.Body>
//                                 <Card.Title>Card Title</Card.Title>
//                             </Card.Body>
//                             <ListGroup className="list-group-flush">
//                                 <ListGroupItem>Cras justo odio</ListGroupItem>
//                                 <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
//                                 <ListGroupItem>Vestibulum at eros</ListGroupItem>
//                             </ListGroup>
//                             <Card.Body>
//                                 <Card.Link href="#">Card Link</Card.Link>
//                                 <Card.Link href="#">Another Link</Card.Link>
//                             </Card.Body>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>
//         </Container>
//     );
// }

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {Container} from "react-bootstrap";
import bookPic from "../components/Images/single-red-book-isolated-white-background-113636020.jpg";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ColumnsGrid() {
    return (
        <Container>
            <h2>Book Details</h2>
            <br/>
            <br/>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={8}>
                        <img src={bookPic} alt="Books"/>
                    </Grid>
                    <Grid item xs={8}>
                        <p>Title</p>
                        <br/>
                        <p>Author</p>
                        <br/>
                        <p>Category</p>
                        <br/>
                        <p>Description</p>
                        <br/>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>xs=8</Item>
                    </Grid>
                </Grid>
            </Box>
        </Container>

    );
}

