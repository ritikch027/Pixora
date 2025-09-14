import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { apiCall } from "../../api/index.js";
import Categories from "../../components/categories.jsx";
import FilterModal from "../../components/FilterModal.jsx";
import ImageGrid from "../../components/ImageGrid.jsx";
import { theme } from "../../constants/theme";
import { capitalize, hp, wp } from "../../helpers/common";

var page = 1;

const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [filters, setFilters] = useState(null);
  const [images, setImages] = useState([]);
  const scrollRef = useRef(null);
  const searchInputRef = useRef(null);
  const modalRef = useRef(null);
  const router = useRouter();
  const [isEndReached, setIsEndReached] = useState(false);

  const handleChangeCategory = (cat) => {
    setActiveCategory(cat);
    clearSearch();
    setImages([]);
    page = 1;
    let params = {
      page,
      ...filters,
    };
    if (cat) params.category = cat.toLowerCase();
    fetchImages(params, false);
  };

  useEffect(() => {
    fetchImages();
  }, []);
  const fetchImages = async (params = { page: 1 }, append = false) => {
    const res = await apiCall(params);
    if (res.success && res.data?.hits) {
      if (append) {
        setImages([...images, ...res.data.hits]);
      } else setImages([...res.data.hits]);
    }
  };

  const handleSearch = (text) => {
    setSearch(text);
    setActiveCategory(null);
    if (text.length > 2) {
      page = 1;
      setImages([]);
      fetchImages({ q: text, page: 1, ...filters }, false);
    }
    if (text == "") {
      page = 1;
      setImages([]);
      searchInputRef?.current?.clear();
      fetchImages({ page, ...filters }, false);
    }
  };
  const clearSearch = () => {
    setSearch("");
    page = 1;
    setImages([]);
    searchInputRef?.current?.clear();
  };

  const openFilterModal = () => {
    modalRef.current?.present();
  };
  const closeFilterModal = () => {
    modalRef.current?.close();
  };
  const applyFilters = () => {
    if (filters) {
      page = 1;
      setImages([]);
      let params = { page, ...filters };
      if (activeCategory) params.category = activeCategory.toLowerCase();
      if (search) params.q = search;
      fetchImages(params, false);
    }
    closeFilterModal();
  };
  const resetFilters = () => {
    if (filters) {
      page = 1;
      setImages([]);
      let params = { page };
      setFilters(null);
      if (activeCategory) params.category = activeCategory.toLowerCase();
      if (search) params.q = search;
      fetchImages(params, false);
    }
    closeFilterModal();
  };
  const clearThisFilter = (filterName) => {
    let filterz = { ...filters };
    delete filterz[filterName];
    setFilters({ ...filterz });
    page = 1;
    setImages([]);
    let params = { page, ...filterz };
    if (activeCategory) params.category = activeCategory.toLowerCase();
    if (search) params.q = search;
    fetchImages(params, false);
  };
  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollOffset = event.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeight;
    if (scrollOffset > bottomPosition - 1) {
      if (!isEndReached) {
        setIsEndReached(true);
        page++;
        let params = {
          page,
          ...filters,
        };
        if (activeCategory) params.category = activeCategory.toLowerCase();
        if (search) params.q = search;
        fetchImages(params, true);
      }
    } else if (isEndReached) {
      setIsEndReached(false);
    }
  };
  const handleScrollUp = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* header Content */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleScrollUp} activeOpacity={0.6}>
          <Text style={styles.title}>Pixora</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8}>
          <FontAwesome6
            onPress={openFilterModal}
            name="bars-staggered"
            style={styles.icon}
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </TouchableOpacity>
      </View>
      {/* searchBar */}
      <ScrollView
        scrollEventThrottle={5}
        onScroll={handleScroll}
        ref={scrollRef}
        contentContainerStyle={{
          gap: 15,
        }}
      >
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>
          <TextInput
            onChangeText={handleTextDebounce}
            placeholder="Search for photos..."
            placeholderTextColor={theme.colors.neutral(0.2)}
            style={styles.searchInput}
            ref={searchInputRef}
          />
          {search && (
            <TouchableOpacity
              onPress={() => handleSearch("")}
              style={styles.closeIcon}
            >
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* Categories */}

        <Categories
          activeCategory={activeCategory}
          onChangeCategory={handleChangeCategory}
        />

        {filters && (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filter}
            >
              {Object.keys(filters).map((key, index) => {
                return (
                  <View key={key} style={styles.filterItem}>
                    {key == "colors" ? (
                      <View
                        style={{
                          height: 20,
                          width: 30,
                          backgroundColor: filters[key],
                          borderRadius: 7,
                        }}
                      ></View>
                    ) : (
                      <Text style={styles.filterItemText}>
                        {capitalize(filters[key])}
                      </Text>
                    )}
                    <TouchableOpacity
                      style={styles.filterCloseIcon}
                      onPress={() => clearThisFilter(key)}
                    >
                      <Ionicons
                        name="close"
                        size={14}
                        color={theme.colors.neutral(0.9)}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* images section-mansory layout */}
        <View>
          {images.length > 0 && <ImageGrid images={images} router={router} />}
        </View>

        <View
          style={{
            marginBottom: 70,
            marginTop: images.length > 0 ? 10 : hp(30),
          }}
        >
          <ActivityIndicator size="large" color={theme.colors.neutral(0.8)} />
        </View>
      </ScrollView>

      <FilterModal
        modalRef={modalRef}
        filters={filters}
        setFilters={setFilters}
        onApply={applyFilters}
        onReset={resetFilters}
        onClose={closeFilterModal}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(4),
    alignItems: "center",
  },
  icon: {
    paddingVertical: 10,
    paddingHorizontal: wp(1),
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.8),
    paddingLeft: wp(1),
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: wp(2),
    paddingLeft: wp(2),
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    outline: "none",
    fontSize: hp(1.8),
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: theme.colors.neutral(0.6),
    fontWeight: theme.fontWeights.medium,
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
    marginLeft: wp(1),
  },
  filter: {
    paddingHorizontal: wp(4),
    gap: 10,
  },
  filterItem: {
    backgroundColor: theme.colors.grayBG,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(2),
    paddingVertical: wp(1.5),
    borderRadius: theme.radius.sm,
    // borderWidth: 1,
    // borderColor: theme.colors.neutral(0.6),
  },
  filterItemText: {
    fontSize: hp(1.9),
    fontWeight: theme.fontWeights.medium,
  },
  filterCloseIcon: {
    padding: 4,
    backgroundColor: theme.colors.neutral(0.2),
    marginLeft: 2,
    borderRadius: theme.radius.sm,
  },
});
