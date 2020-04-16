package com.example.lauraapp.ui.dashboard

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import com.example.lauraapp.R



class DashboardFragment : Fragment() {

    private lateinit var dashboardViewModel: DashboardViewModel

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        dashboardViewModel =
            ViewModelProviders.of(this).get(DashboardViewModel::class.java)

        val root = inflater.inflate(R.layout.fragment_dashboard, container, false)

        val myWebView2: WebView = root.findViewById(R.id.web_gutschein)

        val webSettings = myWebView2.getSettings()
        webSettings.setJavaScriptEnabled(true)
        webSettings.setDatabaseEnabled(true)

        myWebView2.loadUrl("file:///android_asset/www/ListBet.html")
        myWebView2.webViewClient = WebViewClient()

        return root
    }
}