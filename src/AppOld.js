import './App.css';
import NEWS from "./queries";
import {useQuery} from "@apollo/client";

function AppOld() {
    return (
        <div className="App">
            <h2>All scrapped news</h2>
            <ul>
                <News/>
            </ul>
        </div>
    );
}

function News() {
    const {loading, error, data} = useQuery(NEWS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.news.map(({id, title, author, views, publishDate}) => (
        <li key={id}>
            <div>Title: {title}</div>
            <div>Author: {author}</div>
            <div>Views: {views}</div>
            <div>Publish date: {publishDate}</div>
        </li>
    ));
}

export default AppOld;