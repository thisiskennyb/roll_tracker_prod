import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#2a4f60',
    color: '#67bace',
    fontFamily: 'Fira Sans Extra Condensed'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontFamily: 'Fira Sans Extra Condensed',

  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#67bace',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#5C8093',
  },  
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function CustomizedTables({ foundCoins, removeCoinHandler }) {
  const navigate = useNavigate();
  const [isIconHovered, setIsIconHovered] = React.useState(false);

  const handleIconMouseEnter = () => {
    setIsIconHovered(true);
  };

  const handleIconMouseLeave = () => {
    setIsIconHovered(false);
  };
  // console.log(foundCoins[0].coin)
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 700, ml: 25 }}>
      <Table aria-label="customized table">
        <TableHead >
          <TableRow>
          <StyledTableCell></StyledTableCell>
            <StyledTableCell align="right">Year</StyledTableCell>
            <StyledTableCell align="right">Mint Mark</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">Mintage</StyledTableCell>
            <StyledTableCell align="right">Point Value</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Remove</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foundCoins.map((coin, index) => (
            <StyledTableRow key={coin.id}>
              <StyledTableCell component="th" scope="coin">

            {typeof coin.coin == 'undefined' ? (
                <Link to={`/coin/${coin.id}/details/`} state={{ prevPath: '/hunt-log' }}>
                <Button id="view-button" size="small">view</Button>
                </Link>
                ) : (
                <Link to={`/coin/${coin.coin}/details/`} state={{ prevPath: '/hunt-log' }}>
                <Button id="view-button" size="small">view</Button>
                </Link>
                )}

              {/* <Link to={`/coin/${coin.id}/details/`} state={{ prevPath: '/hunt-log' }}>
              <Button id="view-button" size="small">view</Button>
              </Link> */}
              </StyledTableCell>
              <StyledTableCell align="right">{coin.year}</StyledTableCell>
              <StyledTableCell align="right">{coin.mint_mark}</StyledTableCell>
              <StyledTableCell align="right">{coin.comment}</StyledTableCell>
              <StyledTableCell align="right">{coin.mintage}</StyledTableCell>
              <StyledTableCell align="right">{coin.point_value}</StyledTableCell>
              <StyledTableCell align="right">{coin.quantity}</StyledTableCell>
              <StyledTableCell align="right">
                <DeleteForeverTwoToneIcon
                  style={{
                    cursor: 'pointer',
                    fontWeight: isIconHovered ? 'bold' : 'normal',
                  }}
                  onMouseEnter={handleIconMouseEnter}
                  onMouseLeave={handleIconMouseLeave}
                  onClick={() => removeCoinHandler(index, coin.quantity, coin)}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
