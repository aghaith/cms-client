import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { dateFormmaterNoTime } from "helpers/global";

const ContactsList = (props) => {

    // note : InfiniteScroll cannot be used as a JSX component

    const { fetchMoreData } = props;

    var contacts = fetchMoreData()

    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (contacts?.length > 0) {
            setHasMore(false)
        }
    }, [contacts?.length])

    return (
        <InfiniteScroll
            dataLength={contacts?.length}
            next={() => fetchMoreData()}
            hasMore={hasMore}
            loader={
                <h4 style={{ textAlign: "center" }}>
                    <b>Loading...</b>
                </h4>
            }
            scrollableTarget="scrollableDiv"
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    {contacts?.length === 0 ? <b>No contacts</b> : <b>No more contacts</b>}
                </p>
            }
        >
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Date Created</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <th scope="row">
                                    <p>{item?.name}</p>
                                </th>
                                <th>
                                    <p>{dateFormmaterNoTime(item?.dateCreated)}</p>
                                </th>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </InfiniteScroll>
        )
}

export default ContactsList