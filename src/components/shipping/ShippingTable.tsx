import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Button, Typography} from "@mui/material";
import {createdDate, msToTime} from "../../helpers/functions";
import {useDispatch, useSelector} from "react-redux";
import {putDeliveredShipping, putSendShipping} from "../../modules/shipping/actions";
import {shippingSelector} from "../../modules/shipping/selectors";
import {ShippingStatusEnum} from "../../modules/shipping/types";
import {languageSelector} from "../../modules/auth/selectors";
import {LanguageEnum} from "../../modules/auth/types";
import {englishLanguage, ukraineLanguage} from "../../helpers/localization";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function TableShipping(props: any) {
    const {rows, headers} = props
    const shipping = useSelector(shippingSelector)
    const dispatch = useDispatch()
    const language = useSelector(languageSelector)
    const languageObj = language === LanguageEnum.ua ? ukraineLanguage : englishLanguage
    return (
        <>{rows.length > 0 ?
            <TableContainer>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead style={{background: 'white'}}>
                        <TableRow>
                            {headers.map((header: string, index: number) => {
                                return index === 0 ? <StyledTableCell>{header}</StyledTableCell> :
                                    <StyledTableCell align="right">{header}</StyledTableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: any, index: number) => (
                            <StyledTableRow key={index}>
                                <StyledTableCell
                                    align="right"
                                    style={{textAlign: 'right'}}
                                >
                                    {row.status === ShippingStatusEnum.planned
                                        ?
                                        <Button
                                            onClick={() => {
                                                dispatch(putSendShipping({shipping, index, id: row._id}))
                                            }}
                                        >
                                            {languageObj.send}
                                        </Button>
                                        : row.status === ShippingStatusEnum.sent ?
                                            <Button
                                                onClick={() => {
                                                    dispatch(putDeliveredShipping({shipping, index, id: row._id}))
                                                }}
                                            >
                                                {languageObj.deliver}
                                            </Button>
                                            :
                                            <div style={{color: 'green', fontWeight: 700, fontSize: 25}}>{languageObj.delivered}</div>

                                    }
                                </StyledTableCell>
                                <StyledTableCell
                                    align="right"
                                    style={{textAlign: 'right'}}
                                >
                                    {row.status}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.arrivalTime !== 0 ? msToTime(row.arrivalTime-row.registerDate, language) : '--'}</StyledTableCell>
                                <StyledTableCell align="right">{row.arrivalTime !== 0 ? createdDate(row.arrivalTime) : '--'}</StyledTableCell>
                                <StyledTableCell align="right">{createdDate(row.registerDate)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            : <Typography variant="h6">{languageObj.noDataFound}</Typography>
        }</>
    );
}