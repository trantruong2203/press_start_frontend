import Navbar from '../../component/admin/Navbar';
import AdminRouters from '../../router/AdminRouter';


function HomeAdmin() {
    return (
        <div>
            <Navbar />
            <AdminRouters />
        </div>
    );
}

export default HomeAdmin;