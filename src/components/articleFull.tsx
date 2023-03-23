import IArticle from "@/types/article";
import IComment from "@/types/comment";
import Markdown from "markdown-to-jsx";
import { Box, Tooltip, Link, Typography, Divider, IconButton } from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ShareIcon from '@mui/icons-material/Share';

export default function ArticleFull(props: { article: IArticle, comments: IComment[] }) {
    function unixToDate(unixTimestamp: number) {
        const date = new Date(unixTimestamp * 1000);
        return date.toLocaleString("en-GB", { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }

    return (
        <Box component="div" className="entry"
            sx={{
                margin: '2rem',
                padding: '2rem 2rem 1rem 2rem',
                borderRadius: '5px',
                boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;',
                backgroundColor: 'primary.light'
            }}>
            <Box component="div" className="entry-body">
                <Box component="div" className="entry-header" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ display: { xs: 'none', md: 'flex' }, fontWeight: 600 }}>
                        {props.article.title}
                    </Typography>
                    <Box component="div" className="entry-options" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Tooltip title="Share">
                            <IconButton>
                                <ShareIcon color="secondary" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Open in new tab">
                            <IconButton href={`/article/${props.article._id}`} target="_blank">
                                <OpenInNewIcon color="secondary" />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>

                <Box component="div" className="entry-author"
                    sx={{
                        marginTop: '0.5rem',
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                    <Box component="div"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        <FaceIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    </Box>
                    <Box component="div" className="entry-information">
                        <Link href={`/?author=${props.article.author}`}
                            underline="hover"
                            color="inherit">
                            {props.article.author}
                        </Link>
                        <Link href={`/?date=${unixToDate(props.article.date)}`}
                            underline="hover"
                            color="inherit">
                            <Typography sx={{ fontSize: '0.85rem', opacity: '0.6' }}>
                                {unixToDate(props.article.date)}
                            </Typography>
                        </Link>
                    </Box>
                </Box>

                <Divider sx={{ m: 1 }} />

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
                        <Box component="div" className="entry-image"
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Box component="figure">
                                <Box component="img" alt={props.article.image.alt}
                                    src={props.article.image.src}
                                    sx={{
                                        maxHeight: '17rem',
                                        maxWidth: '17rem',
                                        boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px'
                                    }} />
                                <Box component="figcaption" sx={{ textAlign: 'center' }}>
                                    {props.article.image.caption}
                                </Box>
                            </Box>
                        </Box>
                        : null}
                </Box>
            </Box>

            <Divider>Categories</Divider>

            <Box component="div" className="entry-footer" sx={{ display: 'flex', margin: '0.5rem', justifyContent: 'center' }}>
                {props.article.categories.map((category, index) => (
                    <Link key={index}
                        href={`/?categories=${category}`}
                        underline="hover"
                        color="inherit"
                        sx={{ p: 0.5, m: 0.5, fontWeight: 600 }}>
                        {category}
                    </Link>
                ))}
            </Box>

            <Divider>Comments</Divider>

            <Box component="div" className="entry-footer" sx={{ display: 'flex', flexDirection: 'column' }}>
                {props.comments.map((comment, index) => (
                    <Box component="div" key={index} sx={{ margin: '1rem', display: 'flex' }}>
                        <Box component="div">
                            <Typography>
                                {comment.author}
                            </Typography>
                            <Typography>
                                {unixToDate(comment.date)}
                            </Typography>
                        </Box>
                        <Box component="div">
                            {comment.content}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}