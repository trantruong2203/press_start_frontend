import React, { useState } from 'react';
import Header from '../../../component/admin/Header';
import { createPlatformThunk } from '../../../features/platform/PlatformThunks';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../../store/store';
import PlatFormModal from './PlatFormModal';
import PlatformTable from './PlatformTable';
import type { PlatformCreate } from '../../../interface/PlatformResponse';

const inner: PlatformCreate = {  name: "" , status: true }

function PlatForm() {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const [platform, setPlatform] = useState<PlatformCreate>(inner)
   
    const handleOpen = () => {
        setOpen(true);
        setPlatform(inner)
    };

    const handleClose = () => {
        setOpen(false);
        setPlatform(inner)
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createPlatformThunk(platform));
        handleClose();
    };

    return (
        <div>
            <Header title="Platform" handleOpen={handleOpen} />
            <PlatFormModal
                open={open}
                handleClose={handleClose}
                platform={platform}
                setPlatform={setPlatform}
                handleSubmit={handleSubmit}
            />
            <PlatformTable />
        </div>
    );
}

export default PlatForm;