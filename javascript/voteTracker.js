var allVotes = {};
var numVotes = 0;
var isSorted = false;

$(document).ready(function() {
	$('#submitVote').click(function() {
		entryNumber = $('#voteNum').val();
		$('#voteNum').val("");

		if(Boolean(entryNumber) && entryNumber != ' ' && entryNumber != 0){
			isSorted = false;

			index = indexOfEntryNumber(entryNumber);

			if(index >= 0){
				currentEntry = allVotes[index];
				currentEntry.votes = currentEntry.votes + 1;
			}
			else {
				allVotes[numVotes] = {number: entryNumber, votes: 1};
				numVotes++;
			}
		}
	});

	$('#getTopVotes').click(function() {
		displayVotes($('#numVotes').val());

		$('#numVotes').val("");
	});

	$('#displayAllVotes').click(function() {
		displayVotes(numVotes);
	});

});

function indexOfEntryNumber(number){
	for(var i=0; i<numVotes; i++){
		if(allVotes[i].number == number){
			return i;
		}
	}
	return -1;
}

function displayVotes(numEntries){
	if (!isSorted && numVotes > 1) {
		quickSort(allVotes, 0, numVotes - 1);
		isSorted = true;
	}

	buildHTML(numEntries);
}

function buildHTML(numEntries){
	var entryList;
	if(numEntries && numEntries > 0){
		entryList = "<br><h3>All Entries </h3>";

		for(var i=0; i < numEntries; i++){
			entryList += "<p> Entry: " + allVotes[i].number + " Votes: " + 
				allVotes[i].votes + "</p>";
		}
	} else{
		entryList = "<br><h3>No Entries </h3>";
	}
	$("#voteDisplay").html(entryList);

}

function quickSort(items, left, right) {

    var index;
    var length = right - left;

    if (length > 1) {

        index = partition(items, left, right);

        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }

        if (index < right) {
            quickSort(items, index, right);
        }

    }

    return items;
}

function partition(items, left, right) {

    var pivot   = items[Math.floor((right + left) / 2)],
        i       = left,
        j       = right;


    while (i <= j) {

        while (items[i].votes > pivot.votes) {
            i++;
        }

        while (items[j].votes < pivot.votes) {
            j--;
        }

        if (i <= j) {
            swap(items, i, j);
            i++;
            j--;
        }
    }

    return i;
}

function swap(items, firstIndex, secondIndex){
    var temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}
