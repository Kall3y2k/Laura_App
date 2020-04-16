package com.example.lauraapp.ui.home

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.example.lauraapp.R
import android.webkit.WebSettings



class HomeFragment : Fragment() {

    private lateinit var homeViewModel: HomeViewModel

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        homeViewModel =
            ViewModelProviders.of(this).get(HomeViewModel::class.java)

        val root = inflater.inflate(R.layout.fragment_home, container, false)

        val myWebView: WebView = root.findViewById(R.id.web_home)

        val webSettings = myWebView.getSettings()
        webSettings.setJavaScriptEnabled(true)
        webSettings.setDatabaseEnabled(true)

        myWebView.loadUrl("file:///android_asset/www/ListFriend.html")
        myWebView.webViewClient = WebViewClient()

        return root
    }
}