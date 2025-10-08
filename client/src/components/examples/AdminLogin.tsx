import AdminLogin from '../AdminLogin';

export default function AdminLoginExample() {
  return <AdminLogin onLogin={(u, p) => console.log('Logged in:', u, p)} />;
}
