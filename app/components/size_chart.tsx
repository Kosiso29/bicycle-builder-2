import { OpenInNew } from "@mui/icons-material";

export default function SizeChart({ size_chart_url }: { size_chart_url: string }) {
    if (!size_chart_url) {
        return null;
    }

    return (
        <div>
            <a href={size_chart_url || ""} target="_blank" rel="noopener noreferrer" className="flex gap-1 underline items-center text-primary">
                size chart
                <OpenInNew fontSize="inherit" />
            </a>
        </div>
    )
}
