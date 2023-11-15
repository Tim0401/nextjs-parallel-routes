import { Dialog, DialogTitle } from "@mui/material";
import Link from "next/link";

export default function page() {
    return <Dialog open={true}>
        <DialogTitle>test-2-dialog</DialogTitle>
        test-2-dialog<br />
        <Link href="/test2/1">Link to test2/1</Link>
    </Dialog>;
}