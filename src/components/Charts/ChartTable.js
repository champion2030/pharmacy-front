import React, {useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import {useDispatch, useSelector} from "react-redux";
import {getChart} from "../../actions/getChart";
import FusionCharts from "fusioncharts";
import ReactFC from "react-fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const ChartTable = () => {

    const dispatch = useDispatch()
    const diagramInfo = useSelector(state => state.chartTableReducer.diagramInfo)
    const requestResult = useSelector(state => state.chartTableReducer.requestResult)

    useEffect(() => {
        dispatch(getChart())
    }, [dispatch])

    const chartConfigs2D = {
        type: "pie2d", // The chart type
        width: "100%", // Width of the chart
        height: "550", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
            chart: {
                caption: "Количество аптек в каждом районе",
                showvalues: "1",
                showpercentintooltip: "0",
                enablemultislicing: "1",
                theme: "fusion"
            },
            data: requestResult
        }
    }

    const chartConfigs3D = {
        type: "pie3d", // The chart type
        width: "100%", // Width of the chart
        height: "550", // Height of the chart
        dataFormat: "json", // Data type
        dataSource: {
            chart: {
                caption: "Количество аптек в каждом районе",
                showvalues: "1",
                showpercentintooltip: "0",
                enablemultislicing: "1",
                theme: "fusion"
            },
            data: requestResult
        }
    };

    return (
        <div>
            <Bar
                data={diagramInfo}
                options={{
                    title: {
                        display: true,
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
            <ReactFC {...chartConfigs2D} />
            <ReactFC {...chartConfigs3D} />
        </div>
    )
}

export default ChartTable;