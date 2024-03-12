'use client'
import ReactEcharts from 'echarts-for-react';
import {EChartsOption} from "echarts";
import {useRouter} from "next/navigation";
import Loading from "@/components/Loading";
import useTaskCharts from "@/hooks/useTaskCharts";
import {useState} from "react";

function TaskManageNoteEditChart(props: {
    noteTaskId: number
}) {

    const {noteTaskId} = props
    const {data, isLoading, error} = useTaskCharts(noteTaskId)
    const router = useRouter()
    const chartData: any = useState({
        segments: [],
        hourArray: [],
        data: []
    })

    if (isLoading) {
        return (
            <div className="w-full h-[300px]">
                <Loading/>
            </div>
        )
    } else {
        // 找出updateTime参数的最大和最小值
        const updateTimes = data?.map(entry => new Date(entry.updateTime).getTime());
        const minUpdateTime = new Date(Math.min(...updateTimes));
        const maxUpdateTime = new Date(Math.max(...updateTimes));

        // 找出noteEditCount的最大值
        const maxEditCount = Math.max(...data.map(entry => entry.noteEditCount));

        const segmentCount = 5;

        const segmentInterval = Math.floor(maxEditCount / segmentCount);

        chartData.segments = []
        for (let i = 1; i <= segmentCount; i++) {
            const start = (i - 1) * segmentInterval;
            const end = i * segmentInterval;
            chartData.segments.push({start, end});
        }

        const minHour = minUpdateTime.getHours();
        const maxHour = maxUpdateTime.getHours();

        chartData.hourArray = []
        for (let hour = minHour; hour <= maxHour; hour++) {
            chartData.hourArray.push(hour);
        }

        chartData.data = []
        data?.forEach((item, index) => {
            const entry = [new Date(item.updateTime).getHours() - minHour, Math.floor(item.noteEditCount / segmentInterval), [item]]

            const entryIndex = chartData.data.findIndex(item => {
                return item[0] == entry[0] && item[1] == entry[1]
            })
            if (entryIndex != -1) {
                const students: any = chartData.data[entryIndex][2]
                students[students.length] = item
                chartData.data[entryIndex] = [new Date(item.updateTime).getHours() - minHour, Math.floor(item.noteEditCount / segmentInterval), students]
            } else {
                chartData.data.push(entry)
            }
        })
    }

    const option: EChartsOption = {
        tooltip: {
            position: 'top',
            trigger: 'item',
            formatter: function (params) {
                const students = chartData.data.find(item => {
                    return item[0] == params.data[0] && item[1] == params.data[1]
                })[2]
                let html = '统计人数: <br>'

                students.forEach((item, index) => {
                    html += '姓名：' + item.nickname + ' , 编辑次数：' + item.noteEditCount + '<br>'
                })
                return html
            }
        },
        grid: {
            height: '50%',
            top: '10%'
        },
        xAxis: {
            type: 'category',
            data: chartData.hourArray.map(item =>{
                return item + '点'
            }),
            splitArea: {
                show: true
            }
        },
        yAxis: {
            type: 'category',
            data: chartData.segments.map(item => {
                return item.start + " - " + item.end + ' 次'
            }),
            splitArea: {
                show: true
            }
        },
        visualMap: {
            min: 0,
            max: 10,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%'
        },
        series: [
            {
                name: 'Punch Card',
                type: 'heatmap',
                data: chartData.data.map((item) => {
                    return [item[0], item[1], item[2].length]
                }),
                label: {
                    show: true,
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    }

    const onChartClick = (params: any) => {
        if (data) {
            router.push(`/note/${data[params.dataIndex].noteId}`)
        }
    }


    return (
        <div>

            <ReactEcharts
                // onEvents={{
                //     click: onChartClick
                // }}
                option={option}
            />

        </div>
    )
}


export default TaskManageNoteEditChart
