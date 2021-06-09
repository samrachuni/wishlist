import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import UploadIcon from '@material-ui/icons/CloudUpload';
import { Alert, AlertTitle } from '@material-ui/lab';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const api = 'http://localhost:3000';
const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
		width: '100%',
		overflow: 'hidden',
		justifyContent: 'center',
		display: 'flex',
		flex: 1,
		backgroundColor: '#efefef',
		height: '100vh',
	},
	demo: {
		backgroundColor: theme.palette.background.paper,
	},
	title: {
		margin: theme.spacing(4, 0, 2),
	},
}));

export default function Upload() {
	const classes = useStyles();

	const [videos, setVideos] = useState([]);
	const [open, setOpen] = React.useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [fileNameToDelete, setFileNameToDelete] = useState('');
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setFileNameToDelete('');
	};
	useEffect(() => {
		Axios.get(api + '/videos')
			.then((res) => {
				setVideos(res.data);
			})
			.catch((e) => console.log(e));
	}, []);

	const handleDelete = (name) => {
		setFileNameToDelete(name);
		handleClickOpen();
	};

	const handleAgree = () => {
		console.log();
		if (fileNameToDelete === '') return;
		Axios({
			method: 'POST',
			url: api + '/delete',
			data: {
				name: fileNameToDelete,
			},
		})
			.then((res) => {
				setVideos(res.data);
				handleClose();
				setShowAlert(true);
				setTimeout(() => setShowAlert(false), 3500);
			})
			.catch((e) => {
				console.log(e);
				handleClose();
				setFileNameToDelete('');
			});
	};
	return (
		<div className={classes.root}>
			<Collapse
				in={showAlert}
				style={{
					position: 'absolute',
					bottom: 32,
					right: 32,
					width: fullScreen ? '50%' : '30%',
					zIndex: 100,
				}}
			>
				<Alert
					action={
						<IconButton
							aria-label='close'
							color='inherit'
							size='small'
							onClick={() => {
								setShowAlert(false);
							}}
						>
							<CloseIcon fontSize='inherit' />
						</IconButton>
					}
				>
					Success!
				</Alert>
			</Collapse>
			<Dialog
				fullScreen={false}
				open={open}
				onClose={handleClose}
				aria-labelledby='responsive-dialog-title'
			>
				<DialogTitle id='responsive-dialog-title'>
					{'Are you sure?'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete the file <b>{fileNameToDelete}</b>{' '}
						from the server?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAgree} color='primary' autoFocus>
						Ok
					</Button>
					<Button autoFocus onClick={handleClose} color='secondary'>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
			<IconButton
				style={{
					position: 'absolute',
					right: 8,
					top: 8,
					zIndex: 2000,
				}}
			>
				<UploadIcon
					color='primary'
					style={{ fontSize: 32 }}
					onClick={() => {
						console.log('upload');
					}}
				></UploadIcon>{' '}
			</IconButton>

			<List
				style={{
					width: '100%',
					overflow: 'auto',
					marginTop: !fullScreen ? 0 : 64,
					padding: !fullScreen ? 72 : 16,
					paddingTop: 64,
				}}
				dense
			>
				{videos.map((video) => {
					return (
						<ListItem
							style={{
								backgroundColor: '#fff',
								marginBottom: 16,
								padding: 8,
							}}
						>
							<ListItemAvatar>
								<Avatar>
									<FolderIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={video} style={{ fontSize: 16 }} />
							<ListItemSecondaryAction>
								<IconButton edge='end' aria-label='delete'>
									<DeleteIcon
										color='secondary'
										onClick={() => handleDelete(video)}
									/>
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					);
				})}
			</List>
		</div>
	);
}
