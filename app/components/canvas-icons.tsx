import { Star, StarOutline, ShareOutlined } from "@mui/icons-material";
import { useState } from "react";

export default function CanvasIcons() {
    const [favorite, setFavorite] = useState(false);

    return (
        <div className="absolute flex gap-2 right-10 top-10">
            {
                favorite ? <Star className="cursor-pointer" onClick={() => setFavorite(false)} /> :
                    <StarOutline className="cursor-pointer" onClick={() => setFavorite(true)} />
            }
            <ShareOutlined className="cursor-pointer" />
        </div>
    )
}
