import IArticle from "@/types/article";
import Markdown from "markdown-to-jsx";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Box, Tooltip, Link, Typography } from "@mui/material";

export default function Article(props: { article: IArticle }) {
    return (
        <Box component="div" className="entry"
            sx={{
                margin: '2rem',
                padding: '2rem 2rem 1rem 2rem',
                borderRadius: '5px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                backgroundColor: 'primary.light'
            }}>
            <Box component="div" className="entry-body">
                <Box component="div" className="entry-date"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}>
                    <Tooltip title="Publish date">
                        <CalendarMonthIcon />
                    </Tooltip>
                    {props.article.date}
                </Box>

                <h2>{props.article.title}</h2>

                <Box component="div" className="entry-author"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}>
                    <Tooltip title="Author">
                        <PermIdentityIcon />
                    </Tooltip>

                    <Link href={`?author=${props.article.author}`}
                        underline="hover"
                        color="inherit">
                        {props.article.author}
                    </Link>
                </Box>

                <Box component="div" className="entry-content"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                    
                    <Box component="div" className="entry-text">
                        <Markdown>
                            {props.article.content}
                        </Markdown>
                    </Box>

                    {props.article.image ?
                        <Box component="div" className="entry-image">
                            <Box component="img" alt={props.article.image}
                                src={"/images/" + props.article.image}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = "/images/theo.jpeg";
                                }}
                                sx={{
                                    height: '15rem',
                                    marginLeft: '1.5rem',
                                    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
                                }}/>
                        </Box>
                        : null}
                </Box>
            </Box>

            <Box component="div" className="entry-footer">
                <Typography paragraph
                    sx={{
                        margin: '0.25rem'
                    }}>
                    Categories:
                    {props.article.categories.map((category, index) => (
                        <Link key={index}
                            href={`?categories=${category}`}
                            underline="hover"
                            color="inherit"
                            sx={{
                                marginLeft: '0.5rem'
                            }}>
                            {category}
                        </Link>
                    ))}
                </Typography>
            </Box>
        </Box>
    )
}