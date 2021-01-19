import Layout from '../../components/layout';
import Form from '../../components/Form';
import { metaB2eMember } from '../../config/meta';
export default function B2E_Form() {
    return (
        <Layout meta={metaB2eMember}>
            <Form />
        </Layout>
    );
}
