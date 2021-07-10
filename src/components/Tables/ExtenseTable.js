import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ActionTableIcons from '../UI/ActionTableIcons';
import AddUsercon from '../UI/Icons/AddUserIcon';
import styles from './ExtenseTable.module.scss';

const useInnerSytles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  row: {
    textAlign: 'center',
  },
  details: {
    textAlign: 'center',
    padding: '25px',
  },
});

function Row(props) {
  const {
    dataElement,
    detailsHeaders,
    mainKeys,
    detailsKeys,
    onEditHandler,
    onDelete,
  } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useInnerSytles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {mainKeys.map((key, i) => {
          return (
            <TableCell className={classes.row} key={i + [dataElement['id']]}>
              {dataElement[key]}
            </TableCell>
          );
        })}
        <TableCell>
          <ActionTableIcons
            onEdit={onEditHandler}
            onDelete={() => onDelete(dataElement['id'])}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Detalles
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {detailsHeaders.map((header, i) => (
                      <TableCell className={classes.row} key={i + header}>
                        {header}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataElement['details'].map((element, i) => (
                    <TableRow
                      className={classes.details}
                      key={i + element['id']}
                    >
                      {detailsKeys.map((key, i) => {
                        return (
                          <TableCell
                            className={classes.details}
                            key={i + [dataElement['id']]}
                          >
                            {element[key]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ExtenseTable(props) {
  const { mainHeaders, mapData, tableData } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const classes = useInnerSytles();

  const data = mapData(tableData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer className={props.className} component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                <AddUsercon className={styles.AddCustomerIcon} />
              </TableCell>
              {mainHeaders.map((header, i) => (
                <TableCell className={classes.row} key={i + header}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((element, i) => (
                <Row key={element.id + i} dataElement={element} {...props} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
