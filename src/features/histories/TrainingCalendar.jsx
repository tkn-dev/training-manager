/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowRight, MdDoubleArrow } from 'react-icons/md';
import { getRecordsBySpecifiedMonth } from '../../api/records';
import useCreateDayListView from './hooks/useCreateDayListView';
import useMoveYearMonth from './hooks/useMoveYearMonth';

const moveNext = css({
  height: '15px',
  width: '15px',
});
const movePrev = css(moveNext, {
  transform: 'rotate(180deg)',
});
const weekDayContainer = css({
  display: 'flex',
});
const weekDays = css({
  width: '14%',
  textAlign: 'center',
  backgroundColor: 'transparent',
  border: 'solid 0.1rem lightgray',
  borderBottom: 'solid 0.1rem lightgray',
  textDecoration: 'none',
});
const daysContainer = css({
  display: 'flex',
  flexWrap: 'wrap',
});

export default function TrainingCalendar({ setDailyRecordList, setSelectedDate }) {
  const [
    selectedYear,
    selectedMonth,
    moveToPrevYear,
    moveToNextYear,
    moveToPrevMonth,
    moveToNextMonth,
  ] = useMoveYearMonth();
  const [selectedYearMonth, setSelectedYearMonth] = useState();
  const [recordList, setRecordList] = useState();
  const [dayListView, setDayListView] = useState();

  const onSelectDate = (date) => {
    setDailyRecordList(recordList.filter((record) => record.exercise_date === date));
    setSelectedDate(date);
  };
  const [createDayListView] = useCreateDayListView(
    selectedYear,
    selectedMonth,
    recordList,
    onSelectDate,
  );

  useEffect(() => {
    setSelectedYearMonth(selectedYear + '年' + selectedMonth + '月');
  }, [selectedYear, selectedMonth]);

  useEffect(async () => {
    const res = await getRecordsBySpecifiedMonth(selectedYear, selectedMonth);
    setRecordList(res.results);
  }, [selectedYearMonth]);

  useEffect(() => {
    if (!recordList) return;
    setDayListView(createDayListView());
  }, [recordList]);

  return (
    <div>
      <div id="navigationContainer">
        <MdDoubleArrow id="prevYear" css={movePrev} onClick={() => moveToPrevYear()} />
        <MdKeyboardArrowRight id="prevMonth" css={movePrev} onClick={() => moveToPrevMonth()} />
        <span id="selectedYearMonth">{selectedYearMonth}</span>
        <MdKeyboardArrowRight id="nextMonth" css={moveNext} onClick={() => moveToNextMonth()} />
        <MdDoubleArrow id="nextYear" css={moveNext} onClick={() => moveToNextYear()} />
      </div>

      <div id="weekDayContainer" css={weekDayContainer}>
        <abbr id="monday" css={weekDays} title="月曜日">
          月
        </abbr>
        <abbr id="tuesday" css={weekDays} title="火曜日">
          火
        </abbr>
        <abbr id="wednesday" css={weekDays} title="水曜日">
          水
        </abbr>
        <abbr id="thursday" css={weekDays} title="木曜日">
          木
        </abbr>
        <abbr id="friday" css={weekDays} title="金曜日">
          金
        </abbr>
        <abbr id="saturday" css={weekDays} title="土曜日">
          土
        </abbr>
        <abbr id="sunday" css={weekDays} title="日曜日">
          日
        </abbr>
      </div>

      <div id="daysContainer" css={daysContainer}>
        {dayListView}
      </div>
    </div>
  );
}
