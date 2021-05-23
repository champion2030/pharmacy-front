import React, {useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import {useDispatch, useSelector} from "react-redux";
import {get3DChart, getChart} from "../../actions/getChart";
import FusionCharts from "fusioncharts";
import ReactFC from "react-fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFusioncharts from "react-fusioncharts";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const ChartTable = () => {

    const dispatch = useDispatch()
    const diagramInfo = useSelector(state => state.chartTableReducer.diagramInfo)
    const requestResult = useSelector(state => state.chartTableReducer.requestResult)
    const category = useSelector(state => state.chartTableReducer.category)
    const dataset = useSelector(state => state.chartTableReducer.dataset)


    useEffect(() => {
        dispatch(getChart())
        dispatch(get3DChart())
    }, [dispatch])

    const chartConfigs3D = {
        type: "pie3d",
        width: "100%",
        height: "550",
        dataFormat: "json",
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

    const dataSource = {
        chart: {
            caption: "Количество аптек каждого типа собственности в каждом районе",
            xaxisname: "Название районов",
            yaxisname: "Количество аптек",
            plottooltext:
                "<b>$dataValue</b> аптек типа собственности <b>$seriesName</b> в $label районе",
            theme: "fusion"
        },
        categories: [
            {
                category: category
            }
        ],
        dataset: dataset
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
            <ReactFC {...chartConfigs3D} />
            <ReactFusioncharts
                type="mscolumn3d"
                width="100%"
                height="100%"
                dataFormat="JSON"
                dataSource={dataSource}
            />
        </div>
    )
}

export default ChartTable;