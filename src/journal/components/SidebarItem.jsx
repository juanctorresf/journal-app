import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal"

export const SidebarItem = ({ title = '', body, date, id, imageUrls = [] }) => {

    const dispatch = useDispatch()

    const newTitle = useMemo(() => { 
        return title.length > 17 
            ? title.substring(0, 17) + '...'
            : title;
    }, [title] );

    const newBody = useMemo(() => {
        return body.length > 20
            ? body.substring( 0, 20 ) + '...'
            : body;
    }, [body])

    const handleActiveNote = () => {
        dispatch( setActiveNote({ title, body, date, id, imageUrls }) );
    }

    return (
        <ListItem disablePadding onClick={ handleActiveNote } >
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>

                <Grid container >
                    <ListItemText primary={ newTitle }/>
                    <ListItemText secondary={ newBody }/>
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
