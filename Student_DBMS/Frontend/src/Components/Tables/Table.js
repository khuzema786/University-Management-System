import React, { useState, useEffect } from 'react';

import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '../materialProps';

import { PeopleOutlineTwoToneIcon, Search, AddIcon, EditOutlinedIcon, CloseIcon } from '../materialIcons';

import { tabStyle } from '../materialStyles';

import { getAll, insert, update, remove } from '../../Api/request';

import TableForm from './TableForm';

import useTable from './useTable';

import { PageHeader, Popup, Notification, ConfirmDialog, Input, Button, ActionButton } from './Elements';

import { tables, tableName, sections } from '../../Data/infographics.json';

// "tables": {
//   "student": [
//     { "id": "stud_erp", "label": "ERP" },
//     { "id": "course_id", "label": "Course ID" },
//     { "id": "name", "label": "Name" },
//     { "id": "roll_no", "label": "Roll No" }
//   ]
// }

function Table({ table }) {
  // 'student'
  const headings = [...tables[table], { id: 'actions', label: 'Actions', disableSorting: true }];
  const classes = tabStyle();

  const mainName = sections[tableName.indexOf(table)]; //Student
  const primary = tables[table][0].id; //stud_erp

  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState([]); // will need to fix
  const [refresh, setRefresh] = useState(0); // Every time a record is updated or changes, the refresh gets incremented by one and triggers the useEffect to get the details of all students

  useEffect(() => {
    getAll(table).then((res) => {
      setRecords(res);
    });
  }, [refresh, table]);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    }
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: ''
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: ''
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, headings, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === '') return items;
        else
          return items.filter((x) => {
            // [1, 2, 3, 4, 5] =>x>2 return true else return false => [3, 4, 5]
            for (const section in x) {
              if (!isNaN(x[section])) {
                if (String(x[section]).includes(target.value)) return true;
              } else {
                if (x[section].toLowerCase().includes(target.value)) return true;
              }
            }
            return false;
          });
      }
    });
  };

  const addOrEdit = (newTable, resetForm) => {
    const insertion = newTable.insert;

    delete newTable.insert;
    if (insertion) insert(table, newTable).then((r) => onInsertComplete(resetForm));
    else update(table, newTable, newTable[primary]).then((r) => onInsertComplete(resetForm));
  };

  const onInsertComplete = (resetForm) => {
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
    setRefresh(refresh + 1);
    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      type: 'success'
    });
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = (id) => {
    remove(table, id).then(onDeleteComplete);
  };

  const onDeleteComplete = (res) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    });
    setRefresh(refresh + 1);
    setNotify({
      isOpen: true,
      message: 'Deleted Successfully',
      type: 'error'
    });
  };

  return (
    <div>
      <PageHeader
        title={'New ' + mainName}
        subTitle="Response from MySQL"
        icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Input
            label={'Search ' + mainName}
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search style={{ outlineColor: 'white' }} />
                </InputAdornment>
              )
            }}
            onChange={handleSearch}
          />
          <Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item[primary]}>
                {Object.entries(item).map(([key, value]) => {
                  return <TableCell key={Math.random() * 100}>{value}</TableCell>;
                })}
                <TableCell>
                  <ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </ActionButton>
                  <ActionButton
                    color="secondary"
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: 'Are you sure to delete this record?',
                        subTitle: "You can't undo this operation",
                        onConfirm: () => {
                          onDelete(item[primary]);
                        }
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup title={mainName + ' Form'} openPopup={openPopup} setOpenPopup={setOpenPopup}>
        <TableForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} table={table} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
    </div>
  );
}

export default Table;
