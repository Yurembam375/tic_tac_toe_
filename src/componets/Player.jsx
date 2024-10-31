import { useState } from "react"

export default function Player({ intialName, symbol }) {
    const [playerName, setPlayerName] = useState(intialName);
    const [isEditing, setIsEditing] = useState(false);
    function handleClick() {
        setIsEditing((editing) => !editing);

    }
    function handleChange(event) {
        console.log(event);
        setPlayerName(event.target.value);
    }

    let eiditableplayerName = <span className="player-name" >{playerName}</span>
    // let btn="Edit";

    if (isEditing) {
        eiditableplayerName = <input type="text" required defaultValuevalue={playerName} onChange={handleChange} />
        //btn="SAve";
    }
    return (

        <li>
            <span className="player">
                {eiditableplayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    )
}