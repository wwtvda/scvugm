import { Link } from 'umi';
import { Result, Button } from 'antd';
export default () => (
  <Result
    status="403"
    title="403"
    style={{
      background: 'none',
    }}
    subTitle="Mohon maaf, anda tidak memiliki akses ke halaman ini"
    extra={
      <Link to="/">
        <Button type="primary">Back to home</Button>
      </Link>
    }
  />
);
