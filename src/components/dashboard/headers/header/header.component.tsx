import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import './header.scss'

type props = {
    title?: string,
    tooltipTitle?: string,
    value?: number,
    isLoading?: boolean,
}

const Header = (props: props) => {

    const { title, tooltipTitle, value, isLoading } = props;

    const tooltip = (<Tooltip>{tooltipTitle}</Tooltip>);

    return (
        <Card className="p-0 my-2" style={{ height: "128px" }}>
            <div className='card-inner align-content-center align-items-center m-2'>
                <p className='card-title'>{title}</p>
                <OverlayTrigger placement="top" overlay={tooltip}>
                    <i className="fa fa-info-circle"></i>
                </OverlayTrigger>
            </div>
            <div className='card-inner m-2'>
                <p className='value'>{isLoading ? "-" : value}</p>
            </div>
        </Card>
    );
};
export default Header;
