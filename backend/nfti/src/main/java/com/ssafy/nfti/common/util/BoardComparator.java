package com.ssafy.nfti.common.util;

import com.ssafy.nfti.db.entity.Board;
import java.util.Comparator;

public class BoardComparator implements Comparator<Board> {

    @Override
    public int compare(Board o1, Board o2) {
        return o2.getId().compareTo(o1.getId());
    }
}
