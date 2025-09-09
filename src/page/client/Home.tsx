import React from 'react';
import CategoryMenu from '../../component/client/modal/CategoryMenu';
import Header from '../../component/client/Header';
import ClientRouters from '../../router/ClientRouter';

function Home() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }


    return (
       <div>
            <Header handleOpen={handleOpen} />
            <CategoryMenu open={open} handleClose={handleClose} />
            <ClientRouters />
       </div>
       
    );
}

export default Home;