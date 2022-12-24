import { useEffect, useState } from "react";
import "./animeRow.css";
import jsonToArray from "../../commonFunctions/jsonToArray";
function AnimeRow(param) {
    const anime = param.anime;

    const [animeLinks, setAnimeLinks] = useState([]);

    const urlFix = (url) => {
        if (!url) return;
        if (url.substring(0, 4).toLowerCase() !== "http") {
            return "https://" + url;
        }
        return url;
    };

    const getStreamerProvider = (url) => {
        if(!url) {
            return "";
        }
        if (url.search("crunchyroll") >= 0) {
            return "Crunchyroll";
        }
        if (url.search("netflix.com") >= 0) {
            return "Netflix";
        }
        if (url.search("hulu.com") >= 0) {
            return "Hulu";
        }
        if (url.search("vrv.co") >= 0) {
            return "VRV";
        }
        if (url.search("animelab.com") >= 0) {
            return "AnimeLab";
        }
        if (url.search("funimation.com") >= 0) {
            return "Funimation";
        }
        if (url.search("tubitv.com") >= 0) {
            return "TubiTV";
        }
        return url;
    };
    useEffect(() => {
        fetch(`https://kitsu.io/api/edge/anime/${anime.id}/streaming-links`)
            .then((response) => response.json())
            .then((data) => setAnimeLinks(jsonToArray(data)))
            .catch(error => { console.log(error) });
    }, [anime]);

    return (
        <>
            <div className="animeRow anime-grid-container">
                <div className="anime-grid-item"><img src={anime.attributes.posterImage.small} alt={anime.attributes.slug} /></div>
                <div className="anime-grid-item">
                    <h2 className="anime_header"><a href={`https://kitsu.io/anime/${anime.attributes.slug}`} target="_blank">{anime.attributes.canonicalTitle}</a></h2>
                    {/* TODO: Restric Size */}
                    <p>{anime.attributes.description}</p>
                </div>
                <div className="anime-grid-item animeLinks">
                <a href={`https://kitsu.io/anime/${anime.attributes.slug}`} target="_blank">Kitsu</a>
                    {animeLinks.map((item, index) => {
                        return <a key={index} href={urlFix(item.attributes.url)} target="_blank">  {getStreamerProvider(item.attributes.url)} </a>
                    })
                    }</div>

            </div>
        </>
    );
};

export default AnimeRow;