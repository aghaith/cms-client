import { useCallback, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { ColDef, GridReadyEvent, GridApi, RowDoubleClickedEvent } from 'ag-grid-community';
import AgGrid from "components/ag-grid/ag-grid.component";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { AxiosResponse } from "axios";
import ConfirmationModal from "components/confirmation-modal/confirmation-modal.component";
import AddCampaign from "components/add-campaign/add-campaign.component";
import { deleteCampaign, getCampaignsList } from "api/services/campaigns.services";
import { ClonedCampaign, Campaign } from "interfaces/campaign.model";
import { dateFormmaterNoTime } from "helpers/global";
import Copy from "assets/images/copy.svg";
import * as ROUTES from 'constants/routes';

const Campaigns = () => {

  const navigate = useNavigate();
  
  const { data: campaignsList, refetch } = useQuery<Campaign[]>("campaignsList", getCampaignsList);

  const [gridApi, setGridApi] = useState<GridApi>();

  const onGridReady = useCallback((params: GridReadyEvent) => {
    setGridApi(params.api);
  }, []);

  const [newCampaign, setNewCampaign] = useState<ClonedCampaign>()

  const columns: ColDef[] = [
    {
      field: "name",
      headerName: "Name",
      editable: false,
      filter: true
    },
    {
      field: "type",
      headerName: "Type",
      editable: false,
    },
    {
      field: "dateCreated",
      headerName: "Date Created",
      editable: false,
      valueGetter: (params) => dateFormmaterNoTime(params.data.dateCreated),
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      cellRendererFramework: () => {
        return (
          <button type="button" className="btn text-primary">
            <img src={Copy} alt="Copy Icon" />
          </button>
        );
      },
      onCellClicked: (params) => {
        let data = {
          name: 'copy ' + params.data.name,
          type: params.data.type,
          dateCreated: params.data.dateCreated,
          copy : true,
        }
        setNewCampaign(data)
        setShowCopy(true)
      },
    }
  ];

  const [searchTerm, setSearchTerm] = useState<string>('')

  const onSearching = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  };

  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showClear, setShowClear] = useState<boolean>(false);
  const [showCopy, setShowCopy] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);

  const removeCampaignSelected = useCallback(() => {
    const selectedData = gridApi?.getSelectedRows();
    if (selectedData.length === 0) {
      toast.error('No campaigns selected to delete')
      setShowDelete(false)
    } else {
      if ((selectedData?.map(item => item.copy))) {
        gridApi?.applyTransaction({ remove: selectedData });
      }
      removeCampaign.mutate(selectedData?.map((item) => item._id))
      setShowDelete(false)
    }
    // eslint-disable-next-line
  }, [gridApi]);

  const clearCampaigns = useCallback(() => {
    const rowData: Campaign[] = [];
    gridApi?.forEachNode(function (node) {
      rowData.push(node.data._id);
    });
    if(rowData.length === 0) {
      toast.error('No campaigns found to delete')
      setShowClear(false)
    } else {
      removeCampaign.mutate(rowData)
      //gridApi?.applyTransaction({ remove: rowData });
      setShowClear(false)
    }
    // eslint-disable-next-line
  }, [gridApi]);

  const onDeleteClick = () => {
    setShowDelete(true)
  }

  const onClearAllClick = () => {
    setShowClear(true)
  }

  const onConfirmDelete = () => {
    removeCampaignSelected()
  }

  const onConfirmClear = () => {
    clearCampaigns()
  }

  const removeCampaign = useMutation(deleteCampaign, {
    async onSuccess(response: AxiosResponse) {
      setShowDelete(false)
      toast.success(response.data.message);
      refetch()
    }
  });

  const onBtnNext = () => {
    gridApi?.paginationGoToNextPage();
  };

  const onBtnPrevious = () => {
    gridApi?.paginationGoToPreviousPage();
  };

  const onBtnPage25 = () => {
    gridApi?.paginationGoToPage(25);
  };

  const onBtnPage50 = () => {
    gridApi?.paginationGoToPage(50);
  };

  const onBtnPage100 = () => {
    gridApi?.paginationGoToPage(100);
  };

  const onAddCampaignClick = () => {
    setShowAdd(true)
  }

  const onConfirmCopy = () => {
    gridApi?.updateRowData({add: [newCampaign]});
    setNewCampaign({})
    setShowCopy(false)
  }

  const onRowDoubleClicked = (event: RowDoubleClickedEvent) => {
    let id = event.data._id
    navigate(generatePath(`${ROUTES.CAMPAIGN}`, { id }));
  }

  return (
    <>
      <section className="section mt-3">
        <ToastContainer />
        <div className="form-group">
          <input
            className='form-control'
            placeholder="Search"
            onChange={onSearching}
            value={searchTerm}
          />
          <div className="mt-3">
            <button
              className="btn btn-primary"
              onClick={onDeleteClick}>Remove Campaign</button>
            <button
              className="btn btn-primary"
              onClick={onClearAllClick}>Clear Campaigns</button>
            <button
              className="btn btn-primary"
              onClick={onAddCampaignClick}>Add Campaign</button>
          </div>
        </div>
        <div className="grid-box mt-4 px-0">
          <div
            style={{
              height: "100%",
              width: "100%"
            }}
            className="ag-theme-alpine"
          >
            <AgGrid
              rows={campaignsList}
              columns={columns}
              rowHeight={54}
              autoFit={true}
              searchTerm={searchTerm}
              onGridReady={onGridReady}
              multipleSelection={true}
              onRowDoubleClicked={onRowDoubleClicked}
            />
          </div>
        </div>
        <div className="mt-2">
          <button
            className="btn btn-primary"
            onClick={onBtnPrevious}>{`<`}</button>
          <button
            className="btn btn-primary"
            onClick={onBtnNext}>{`>`}</button>
          <button
            className="btn btn-primary"
            onClick={onBtnPage25}>25</button>
          <button
            className="btn btn-primary"
            onClick={onBtnPage50}>50</button>
          <button
            className="btn btn-primary"
            onClick={onBtnPage100}>100</button>
        </div>
      </section>
      <ConfirmationModal
        title="Delete Campaign"
        message="Are you sure? It will be permanently deleted."
        showModal={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => onConfirmDelete()}
        cancelBtnTitle="No, Keep"
        confirmBtnTitle="Yes, Delete"
        type="confirmation-danger"
      />
      <ConfirmationModal
        title="Clear Campaigns"
        message="Are you sure? Campaigns will be permanently cleared."
        showModal={showClear}
        onClose={() => setShowClear(false)}
        onConfirm={() => onConfirmClear()}
        cancelBtnTitle="No, Keep"
        confirmBtnTitle="Yes, Clear"
        type="confirmation-danger"
      />
      <ConfirmationModal
        title="Copy Campaign"
        message="Are you sure?"
        showModal={showCopy}
        onClose={() => setShowCopy(false)}
        onConfirm={() => onConfirmCopy()}
        cancelBtnTitle="No, Keep"
        confirmBtnTitle="Yes, Copy"
        type="confirmation-saving"
      />
      <AddCampaign 
        showModal={showAdd}
        onClose={() => setShowAdd(false)}
        refetch={() => refetch()}
      />
    </>
  )
}

export default Campaigns;
