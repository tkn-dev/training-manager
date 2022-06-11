/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowRight, MdDoubleArrow } from 'react-icons/md';
import { getRecordsBySpecifiedMonth } from '../../api/records';
import { useCreateDayListView } from './hooks/useCreateDayListView';
import { useMoveYearMonth } from './hooks/useMoveYearMonth';
import { COLOR } from '../../style/constants';

const navigation = css({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem'
})
const movePrev = css(moveNext, {
  height: '2.5rem',
  width: '2.5rem',
  marginRight: '1rem',
  transform: 'rotate(180deg)',
  '&:hover': {
    cursor: 'pointer'
  }
});
const moveNext = css({
  height: '2.5rem',
  width: '2.5rem',
  marginLeft: '1rem',
  '&:hover': {
    cursor: 'pointer'
  }
});
const yearMonth = css({
  fontSize: '3rem'
})
const weekDayContainer = css({
  display: 'flex',
});
const weekDays = css({
  width: '14%',
  marginLeft: '-1px',
  textAlign: 'center',
  backgroundColor: 'transparent',
  border: `solid 0.5px ${COLOR.BORDER}`,
  borderBottom: `solid 0.5px ${COLOR.BORDER}`,
  textDecoration: 'none',
});
const daysContainer = css({
  display: 'flex',
  flexWrap: 'wrap',
});

export const TrainingCalendar = ({ setDailyRecordList, setSelectedDate, modifyCount }) => {
  const [
    selectedYear,
    selectedMonth,
    { moveToPrevYear, moveToNextYear, moveToPrevMonth, moveToNextMonth },
  ] = useMoveYearMonth();
  const [selectedYearMonth, setSelectedYearMonth] = useState();
  const [recordList, setRecordList] = useState();
  const [dayListView, setDayListView] = useState();

  const onSelectDate = (date) => {
    setDailyRecordList(recordList.filter((record) => record.exercise_date === date));
    setSelectedDate(date);
  };
  const [createDayListView, getFullDate] = useCreateDayListView(
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

  useEffect(async () => {
    const res = await getRecordsBySpecifiedMonth(selectedYear, selectedMonth);
    setRecordList(res.results);
    const fullDate = getFullDate();
    setDailyRecordList(res.results.filter((record) => record.exercise_date === fullDate));
  }, [modifyCount]);

  useEffect(() => {
    if (!recordList) return;
    setDayListView(createDayListView());
  }, [recordList]);

  return (
    <div>
      <div id="navigationContainer" css={navigation}>
        <MdDoubleArrow id="prevYear" css={movePrev} onClick={() => moveToPrevYear()} />
        <MdKeyboardArrowRight id="prevMonth" css={movePrev} onClick={() => moveToPrevMonth()} />
        <span id="selectedYearMonth" css={yearMonth}>{selectedYearMonth}</span>
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
};
