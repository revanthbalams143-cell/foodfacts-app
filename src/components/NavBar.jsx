import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function NavBar() {
	const savedCount = useSelector((state) => state.saved.items.length)

	return (
		<AppBar position="sticky" color="primary" elevation={0}>
			<Toolbar sx={{ justifyContent: 'space-between' }}>
				<Typography variant="h6" fontWeight={800}>
					🥗 FoodFacts
				</Typography>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<Button color="inherit" component={NavLink} to="/" end>
						Search
					</Button>
					<Button
						color="inherit"
						component={NavLink}
						to="/saved"
						startIcon={
							<Badge badgeContent={savedCount} color="secondary">
								<BookmarkIcon />
							</Badge>
						}
					>
						Saved
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default NavBar
