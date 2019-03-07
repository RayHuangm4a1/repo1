/m/api/video-categories?categoryId=5b73eb8886d00574944a9dc5
/api/video-categories?categoryId=5b73eb8886d00574944a9dc4




$(function(){
	var pageInfo = $('#admin-root').data();




	var trdt = pagd.id;
	var categoryId = pageInfo.cid;
	var tagIds = {};

	var comicCategoriesTable;
	//get pug tag (tableview)
	var $comicCategoriesManagementTable = $('comic-categories-management-table');

	//get all input value
	var $titleInput = $('#title-input');
	var $orderInput = $('#order-input');
	var $comicCategoryNameInput = $('comic-category-name-input');

	//get all modal
	var $addComicCategoryModal = $('#add-comic-category-modal');
	var $comicCategoryEditModal = $('#comic-category-edit-modal');

	//button
	var $addTagButtton = $('#add-tag-btn');
	var $addComicCategorySumbitButton = $('#add-comic-category-submit-btn');
	var $editComicCategorySubmitButton = $('#edit-comic-category-submit-btn');

	//init
	getComicCategoriesAndTags();
	setEventHandler();


	//function definition
	function getComicCategoriesAndTags() {
		$.ajax({
			url: '/api/video-categories?categoryId=' + categoryId,
			type: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			success: function(data) {
				renderComicCategoriesDataTable(data);
			},
			error: function(xhr, textStatus, error) {
				console.error(error);
			}
		});
	}

	function renderComicCategoriesDataTable(comicCategories) {

		comicCategories.sort((a,b) => {
			return a.order - b.order;
		});

		comicCategories = comicCategories.map( comicCategory => {
			if (!tagIds[comicCategory._id]) {
				tagIds[comicCategory._id] = comicCategory.tag[0]._id;
			}

			comicCategory.isInSubmenu = comicCategory.marketingVideoCateforyCodes.indexOf('submenu') !== -1;

			return comicCategory;
		});

		comicCategoriesTable = $comicCategoriesManagementTable.DataTable({
			data: comicCategories,
			autoWidth: false,
			ordering: false,
			searching: false,
			columnDefs: [
				{
					targets: '_all',
					className: 'text-center vertical-center',
				},
			],
			columns: [
				{
					data: 'name',
					render: data => {
						return data;
					},
				},
				{
					data: 'isInSubmenu',
					render: data => {
						var btnClass = data === true ? 'active' : ''
						return '<i class="fa fa-check-circle clickable check-btn btn-edit-submenu ' + btnClass + '"></i>';
					},
					width: '15%',
				},
				{
					data: null,
					render: () => {
						return '<button class="btn btn-comic-category-edit btn-default">修改</button>';
					},
				},
				{
					data: null,
					render: () => {
						return '<button class="btn btn-delete btn-danger">刪除</button>'
					},
				},
			],
			info: false,
			pagingType: 'simple_numbers',
			pageLength: 20,
			lengthMenu: [10, 20, 30],
			language: {
				lengthMenu: '顯示_MENU_項',
				paginate: {
					previous: '<',
					next: '>',
				},
				zeroRecords: '查無符合條件的項目',
			},
			destroy: true,
		});
	}

	// put all element on event
	function setEventHandler() {

		$addTagButtton.on('click', function() {
			$addComicCategoryModal.modal();
		});

		$addComicCategorySumbitButton.data('categoryId', categoryId);

		$addComicCategorySumbitButton.on('click', categoryId);

	}

});
