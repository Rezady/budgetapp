function twoSum (arr, target){
	var i,j
  for(i=0; i< arr.length-1; i++){
  	if(arr[i] > target){
    	continue
    }
  	for(j=1; j<arr.length; j++){
    	if(arr[j] > target){
    		continue
    	}else{
     		if(arr[i] + arr[j] === target){
        	return [i,j]
        } 
      }
    }
  }
  return "tidak ada hasilnya"
}

console.log(twoSum([1,2,3],5)) // index 1 dan 2

