import Layout from '../../components/layout';
import Notification from '../../components/Notification';
import { metaB2eMemberFinish } from '../../config/meta';
export default function Form() {
    return (
        <Layout meta={metaB2eMemberFinish}>
            <Notification />
        </Layout>
    );
}
