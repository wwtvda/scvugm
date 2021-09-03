import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';
export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Brought to you by Vidia Setiadi',
  });
  return (
    <DefaultFooter
      copyright={`2021 ${defaultMessage}`}
      links={[
        {
          key: 'UGM',
          title: 'Universitas Gadjah Mada',
          href: 'https://ugm.id',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/wwtvda',
          blankTarget: true,
        },
      ]}
    />
  );
};
