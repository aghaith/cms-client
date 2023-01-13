import { useQuery } from 'react-query';
import { getHeadersOverview } from 'api/services/dashboard.services';
import { HeaderOverview } from 'interfaces/dashboard.model';
import { Col, Row } from 'react-bootstrap';
import { AxiosError } from 'interfaces/errors.model';
import Header from './header/header.component';

const Headers = () => {

    const {
        isFetching: isLoadingDashboard,
        data: dashboard,
    } = useQuery<
        HeaderOverview[],
        AxiosError
    >("dashboardOverview", getHeadersOverview, {
        refetchOnWindowFocus: false,
    });

    const getBlockByKey = (key): HeaderOverview => {
        return dashboard?.filter((item) => item.key === key)[0];
    };

    const map: { [key: string]: string; } = {
        campaigns: "Campaigns",
        users: "Users",
        contacts: "Contacts",
    };

    const tooltip: { [key: string]: string; } = {
        contacts: "Total number of contacts",
        users: "Total number of users",
        campaigns: 'Total number of campaigns'
    };

    const getTitle = (key): string => {
        return map[key];
    };

    const getTooltip = (key): string => {
        return tooltip[key];
    };

    const buildBlock = (key) => {
        const block: HeaderOverview = getBlockByKey(key);
        return (
            <Col sm>
                <Header
                    title={getTitle(key)}
                    tooltipTitle={getTooltip(key)}
                    value={block ? block?.value : 0}
                    isLoading={isLoadingDashboard}
                />
            </Col>
        );
    };


    return (
        <>
            <Row className='mt-3'>
                {buildBlock("users")}
                {buildBlock("campaigns")}
                {buildBlock("contacts")}
            </Row>
        </>
    );
}

export default Headers;
